import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:salem_app/auth/view/login_page.dart';
import 'package:salem_app/citizen/view/citizen_Main_page.dart';
import 'package:salem_app/Views/employee_pages/employee_main_page.dart';
import 'package:salem_app/auth/cubits/auth_cubit.dart';
import 'package:salem_app/auth/data/user_repo.dart';
import 'package:salem_app/auth/view/welcomePage.dart';

void main() {
  final userRepo = UserRepository();
  runApp(
    BlocProvider(create: (context) => AuthCubit(userRepo), child: MyApp()),
  );
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: EmployeeMainPage(),
      routes: {
        'citizen': (context) => CitizenMainPage(),
        'employee': (context) => EmployeeMainPage(),
        'login': (context) => LoginPage(),
        'welcome': (context) => Welcomepage(),
      },
    );
  }
}
//--android-skip-build-dependency-validation