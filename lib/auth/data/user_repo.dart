import 'package:salem_app/auth/data/user_model.dart';

class UserRepository {
  final List<UserModel> _users = [
    UserModel(
      id: '11111',
      email: 'ccc',
      password: 'ccc',
      role: 'citizen',
      name: 'hassan',
      mobile_num: '01010101010',
    ),
    UserModel(
      id: '22222',
      email: 'eee',
      password: 'eee',
      role: 'employee',
      name: 'michael',
      mobile_num: '01201201200',
    ),
  ];

  UserModel? _currentUser;

  Future<UserModel> signup(
    String email,
    String password,
    String role,
    String name,
    String mobile_num,
  ) async {
    final newUser = UserModel(
      id: DateTime.now().toString(),
      email: email,
      password: password,
      role: role,
      name: name,
      mobile_num: mobile_num,
    );

    _users.add(newUser);
    _currentUser = newUser;

    return newUser;
  }

  Future<UserModel> login(String email, String password) async {
    final user = _users.firstWhere(
      (user) => user.email == email && user.password == password,
      orElse: () => throw Exception("Invalid credentials"),
    );

    _currentUser = user;
    return user;
  }

  Future<UserModel?> getCurrentUser() async {
    return _currentUser;
  }

  Future<void> logout() async {
    _currentUser = null;
  }
}
