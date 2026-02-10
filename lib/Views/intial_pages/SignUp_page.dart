import 'package:flutter/material.dart';
import 'package:salem_app/Views/intial_pages/login_page.dart';
import 'package:salem_app/widgets/common_widgets/customForm_textField.dart';
import 'package:salem_app/widgets/common_widgets/have_or_not_anAccount.dart';
import 'package:salem_app/widgets/common_widgets/signUp_button.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Color(0xff1B4374)),
        centerTitle: true,
        title: Text(
          'New Account',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w700,
            color: Color(0xff1B4374),
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 100),
              CustomFormTextfield(hintText: 'Full name'),
              const SizedBox(height: 20),
              CustomFormTextfield(hintText: 'Email'),
              const SizedBox(height: 20),
              CustomFormTextfield(hintText: 'Password', obscureText: true),
              const SizedBox(height: 20),
              CustomFormTextfield(hintText: 'Mobile number'),
              const SizedBox(height: 20),
              CustomFormTextfield(hintText: 'Date of birth'),
              const SizedBox(height: 60),
              SignupButton(width: 200),
              const SizedBox(height: 20),
              HaveOrNotAnaccount(
                promptText: 'already have an account',
                actionText: 'Log In',
                onActionTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return LoginPage();
                      },
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
