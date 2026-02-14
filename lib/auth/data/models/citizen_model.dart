import 'package:salem_app/auth/data/models/base_user.dart';

class CitizenModel extends BaseUser {
  final String phoneNumber;
  //final String birthDate;
  CitizenModel({
    required String email,
    required String username,
    required String national_id,
    required String user_type,
    required this.phoneNumber,
    //required this.birthDate,
  }) : super(
         email: email,
         username: username,

         national_id: national_id,
         user_type: user_type,
       );

  factory CitizenModel.fromJson(Map<String, dynamic> json) {
    return CitizenModel(
      email: json['email'],
      username: json['username'],

      national_id: json['national_id'],
      user_type: json['user_type'],
      phoneNumber: json['phone_number'],
      //birthDate: json['birth_date'],
    );
  }
}
