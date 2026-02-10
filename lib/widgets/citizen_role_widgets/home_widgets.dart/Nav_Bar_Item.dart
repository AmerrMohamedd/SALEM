import 'package:flutter/material.dart';

class NavBarItem extends StatelessWidget {
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const NavBarItem({
    super.key,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap, 
      child: Icon(
        icon,
        size: 35,
        color: color,
      ),
    );
  }
}
