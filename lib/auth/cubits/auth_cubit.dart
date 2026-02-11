import 'package:bloc/bloc.dart';
import 'package:salem_app/auth/data/user_repo.dart';

part 'auth_state.dart';

class AuthCubit extends Cubit<AuthState> {
  final UserRepository repo;

  AuthCubit(this.repo) : super(AuthInitial());

  Future<void> login(String email, String password) async {
    emit(AuthLoading());
    try {
      await Future.delayed(Duration(seconds: 2));

      final user = await repo.login(email, password);
      emit(AuthAuthenticated(user.role));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  Future<void> signup(String email, String password, String role, String name, String mobile_num) async {
    emit(AuthLoading());
    try {
      final user = await repo.signup(email, password, role, name, mobile_num);
      emit(AuthAuthenticated(user.role));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  void logout() {
    repo.logout();
    emit(AuthInitial());
  }

  Future<void> checkUser() async {
    final user = await repo.getCurrentUser();
    if (user != null) {
      emit(AuthAuthenticated(user.role));
    } else {
      emit(AuthInitial());
    }
  }
}
