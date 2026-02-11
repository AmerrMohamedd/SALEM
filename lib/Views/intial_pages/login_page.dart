import 'package:flutter/material.dart';
import 'package:salem_app/Views/citizen_pages/citizen_Main_page.dart';
import 'package:salem_app/Views/employee_pages/employee_main_page.dart';
import 'package:salem_app/Views/intial_pages/SignUp_page.dart';
import 'package:salem_app/widgets/common_widgets/customForm_textField.dart';
import 'package:salem_app/widgets/common_widgets/have_or_not_anAccount.dart';
import 'package:salem_app/widgets/common_widgets/login_button.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Color(0xff1B4374)),
        centerTitle: true,
        title: Text(
          'Log In',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w700,
            color: Color(0xff1B4374),
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomFormTextfield(hintText: 'Email'),
            const SizedBox(height: 20),
            CustomFormTextfield(hintText: 'Password', obscureText: true),
            const SizedBox(height: 60),
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return EmployeeMainPage();
                    },
                  ),
                );
              },
              child: LoginButton(width: 200),
            ),
            const SizedBox(height: 20),
            HaveOrNotAnaccount(
              promptText: 'Dont have an account ',
              actionText: 'Sign Up',
              onActionTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignupPage();
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
