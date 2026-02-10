import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:salem_app/data/models/location_model.dart';
import 'package:salem_app/data/services/location_service.dart';

class ReportLocationController {
  final LocationService _locationService = LocationService();

  final ValueNotifier<LocationModel?> location = ValueNotifier<LocationModel?>(
    null,
  );

  Future<bool> fetchCurrentLocation() async {
    debugPrint(
        '\n============================================================');
    debugPrint('📍 fetchCurrentLocation CALLED');
    debugPrint(
        '============================================================\n');

    bool serviceEnabled;
    LocationPermission permission;

    // 1️⃣ التحقق من الـ GPS service
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    debugPrint('Location service enabled: $serviceEnabled');

    if (!serviceEnabled) {
      debugPrint(
          '\n================ LOCATION SERVICE DISABLED =================\n');
      return false;
    }

    permission = await Geolocator.checkPermission();
    debugPrint('Current permission status: $permission');

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      debugPrint('Requested permission, new status: $permission');

      if (permission == LocationPermission.denied) {
        debugPrint(
            '\n================ PERMISSION DENIED =================\n');
        return false;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      debugPrint(
          '\n================ PERMISSION DENIED FOREVER =================\n');
      return false;
    }

    try {
      Position position = await _locationService.getCurrentLocation();

      debugPrint(
          '\n================ POSITION OBTAINED =================');
      debugPrint(
          'Lat: ${position.latitude}, Lng: ${position.longitude}');
      debugPrint(
          '====================================================\n');

      final address = await _locationService.getAddressFromCoordinates(
        position.latitude,
        position.longitude,
      );

      debugPrint(
          '\n================ ADDRESS OBTAINED =================');
      debugPrint('Address: $address');
      debugPrint(
          '===================================================\n');

      location.value = LocationModel(
        latitude: position.latitude,
        longitude: position.longitude,
        address: address,
      );

      debugPrint(
          '\n================ LOCATION UPDATED SUCCESSFULLY =================\n');

      return true;
    } catch (e, st) {
      debugPrint(
          '\n================ ERROR FETCHING LOCATION =================');
      debugPrint('Error: $e');
      debugPrint('StackTrace: $st');
      debugPrint(
          '===========================================================\n');
      return false;
    }
  }
}
