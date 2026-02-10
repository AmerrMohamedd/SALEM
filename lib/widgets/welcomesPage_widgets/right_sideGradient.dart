import 'package:flutter/material.dart';

class RightSidegradient extends StatelessWidget {
  const RightSidegradient({super.key});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerRight,
      child: Container(
        width: 20,
        decoration:const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
          ),
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(50),
            bottomLeft: Radius.circular(50),
          ),
        ),
      ),
    );
  }
}
