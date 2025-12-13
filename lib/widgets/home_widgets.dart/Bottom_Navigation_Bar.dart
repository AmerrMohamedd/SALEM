import 'package:flutter/material.dart';

class customBottomNavigationBar extends StatelessWidget {
  const customBottomNavigationBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsetsDirectional.symmetric(horizontal: 28,vertical: 18),
      padding: const EdgeInsets.symmetric(horizontal: 40),
      height: 50,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
        ),
        borderRadius: BorderRadius.circular(25),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Icon(Icons.home, size: 35, color: Colors.teal),
          Icon(Icons.list, size: 35, color: Colors.grey),
          Icon(Icons.person, size: 35, color: Colors.grey),
        ],
      ),
    );
  }
}
