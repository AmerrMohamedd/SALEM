abstract class BaseUser {

  final String email;
  final String username;
  final String national_id;
  final String user_type;

  BaseUser({
   
    required this.email,
    required this.username,

    required this.national_id,
    required this.user_type,
  });
}
