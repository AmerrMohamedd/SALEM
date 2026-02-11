class UserModel {
  final String name;
  final String mobile_num;
  final String id;
  final String email;
  final String password;
  final String role; // citizen / employee

  UserModel({
    required this.id,
    required this.email,
    required this.password,
    required this.role,
    required this.name,
    required this.mobile_num,
  });
}
