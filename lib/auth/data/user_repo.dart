import 'package:dio/dio.dart';
import 'package:salem_app/auth/data/api_services.dart';
import 'package:salem_app/auth/data/models/base_user.dart';
import 'package:salem_app/auth/data/models/citizen_model.dart';
import 'package:salem_app/auth/data/models/employee_model.dart';

class UserRepository {
  final ApiService _api = ApiService();

  /// 🔹 LOGIN
  Future<BaseUser> login(
    String? email,
    String? nationalId,
    String password,
  ) async {
    try {
      final response = await _api.dio.post(
        "/login/",
        data: {
          email != null ? "email" : "national_id": email ?? nationalId,
          "password": password,
        },
      );

      final data = response.data;

      final token = data["tokens"]["access"];
      final userData = data["user_info"];
      print("Login successful, User Data: $userData , Token: $token");
      _api.setToken(token);

      return _mapUser(userData);
    } on DioException catch (e) {
      if (e.response != null) {
        print("Dio Error Response: ${e.response?.data}");
        throw Exception(e.response?.data["detail"] ?? "Login failed");
      } else {
        print("Dio Error Message: ${e.message}");
        throw Exception("Network error: ${e.message}");
      }
    } catch (e) {
      print("Unexpected Error: $e");
      throw Exception("Login failed: $e");
    }
  }

  Future<void> signup(Map<String, dynamic> userData) async {
    try {
      final response = await _api.dio.post("/signup/", data: userData);

      final data = response.data;
      print("response from signup: $data");
    } on DioException catch (e) {
      if (e.response != null) {
        print("Dio Error Response: ${e.response?.data}");
        throw Exception(e.response?.data["detail"] ?? "Signup failed");
      } else {
        print("Dio Error Message: ${e.message}");
        throw Exception("Network error: ${e.message}");
      }
    } catch (e) {
      print("Unexpected Error: $e");
      throw Exception("Signup failed: $e");
    }
  }



  void logout() {
    _api.clearToken();
  }

  BaseUser _mapUser(Map<String, dynamic> userData) {
    if (userData["user_type"] == "citizen") {
      return CitizenModel.fromJson(userData);
    } else {
      return EmployeeModel.fromJson(userData);
    }
  }
}
