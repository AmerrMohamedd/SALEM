import 'package:flutter/material.dart';

class EmployeeButton extends StatelessWidget {
  const EmployeeButton({super.key});

  @override
  Widget build(BuildContext context) {
    return  Container(
      height: 40,
      width: 120,
      decoration: BoxDecoration(
        gradient: LinearGradient(begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF00BE9B), Color(0xFF1B4374)], 
        ),
        borderRadius: BorderRadius.circular(20),
        
      ),
      child: Center(
        child: Text(
          'Employee',
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