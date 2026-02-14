import 'package:flutter/material.dart';
import 'package:salem_app/citizen/data/ReportLocationController.dart';
import 'package:salem_app/citizen/data/location_model.dart';

class GetCurrentLocationSection extends StatelessWidget {
  final ReportLocationController locationController;
  final Future<void> Function() onGetCurrentLocation;

  const GetCurrentLocationSection({
    super.key,
    required this.locationController,
    required this.onGetCurrentLocation,
  });

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<LocationModel?>(
      valueListenable: locationController.location,
      builder: (context, location, _) {
        return PopupMenuButton<String>(
          onSelected: (value) async {
            if (value == 'current') {
              await onGetCurrentLocation();
            } else if (value == 'map') {}
          },
          itemBuilder:
              (context) => const [
                PopupMenuItem(
                  value: 'current',
                  child: Text('Get Current Location'),
                ),
                // PopupMenuItem(value: 'map', child: Text('Select from Map')),
              ],
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              gradient: const LinearGradient(
                colors: [Color(0xFF1CB5A3), Color(0xFF0D47A1)],
              ),
            ),
            child: Row(
              children: [
                const Icon(Icons.location_on_outlined, color: Colors.white),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    location?.address ?? 'Location',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
