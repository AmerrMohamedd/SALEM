import 'package:salem_app/auth/data/models/base_user.dart';

class EmployeeModel extends BaseUser {
  final String role;
  final String department;
  final String region;

  EmployeeModel({
    required String email, 
    required String username, 
    required String national_id,
    required String user_type, 
    required this.role, 
     required this.department,
     required this.region,
  }) : super(
         email: email,
         username: username,

         national_id: national_id,
         user_type: user_type,
       );

  factory EmployeeModel.fromJson(Map<String, dynamic> json) {
    return EmployeeModel(
      email: json['email'],
      username: json['username'],
      national_id: json['national_id'],
      user_type: json['user_type'],
      role: json['role'],
      department: json['department'],
      region: json['region'],
    );
  }
}
