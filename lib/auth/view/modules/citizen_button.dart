import 'package:flutter/material.dart';

class CitizenButton extends StatelessWidget {
  const CitizenButton({super.key});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      width: 120,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: Color(0xff0D3A4B),
      ),
      child: Center(
        child: Text(
          'Citizen',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
