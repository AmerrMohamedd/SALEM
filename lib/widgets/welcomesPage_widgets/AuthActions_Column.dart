import 'package:flutter/material.dart';
import 'package:salem_app/Views/intial_pages/SignUp_page.dart';
import 'package:salem_app/Views/intial_pages/login_page.dart';
import 'package:salem_app/widgets/common_widgets/login_button.dart';
import 'package:salem_app/widgets/common_widgets/signUp_button.dart';

class AuthactionsColumn extends StatelessWidget {
  const AuthactionsColumn({super.key, required this.role});
   final String role;
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) {
                  return LoginPage();
                },
              ),
            );
          },
          child: LoginButton(width: 160,),
        ),
        SizedBox(height: 20),
        if (role == "citizen")
        GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) {
                  return SignupPage();
                },
              ),
            );
          },
          child: SignupButton(width: 160,),
        ),
      ],
    );
  }
}
