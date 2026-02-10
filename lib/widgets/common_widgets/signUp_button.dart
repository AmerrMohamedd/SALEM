import 'package:flutter/material.dart';

class SignupButton extends StatelessWidget {
  const SignupButton({super.key, required this.width});
  final double width;
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 45,
      width: width,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: Color(0xff0D3A4B),
      ),
      child: Center(
        child: Text(
          'Sign Up',
          style: TextStyle(
            color: Colors.white,
            fontSize: 22,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
