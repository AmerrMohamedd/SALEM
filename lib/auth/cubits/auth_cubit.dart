import 'package:bloc/bloc.dart';
import 'package:salem_app/auth/data/models/base_user.dart';
import 'package:salem_app/auth/data/user_repo.dart';

part 'auth_state.dart';

class AuthCubit extends Cubit<AuthState> {
  final UserRepository _repo;
  String user_type = "";
  BaseUser? currentUser;
  AuthCubit(this._repo) : super(AuthInitial());

  Future<void> login(String? email, String? nationalId, String password) async {
    emit(AuthLoading());

    try {
      final user = await _repo.login(email, nationalId, password);
      currentUser = user;
      emit(AuthAuthenticated(user));
    } catch (e) {
      emit(AuthError("Login failed"));
    }
  }

  Future<void> signup(Map<String, dynamic> userData) async {
    emit(AuthLoading());

    try {
      await _repo.signup(userData);
      emit(AuthInitial());
    } catch (e) {
      emit(AuthError("Signup failed : $e"));
    }
  }

  void logout() {
    _repo.logout();
    user_type = "";
    emit(AuthInitial());
  }

  void setUserType_citizen() {
    user_type = 'citizen';
  }

  void setUserType_employee() {
    user_type = 'employee';
  }
}
