import 'package:flutter/material.dart';
import 'package:salem_app/Views/widgets/citizen_role_widgets/home_widgets.dart/Nav_Bar_Item.dart';

class CustomBottomNavigationBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const CustomBottomNavigationBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 28, vertical: 18),
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
          NavBarItem(
            icon: Icons.home,
            color: currentIndex == 0 ? Colors.teal : Colors.grey,
            onTap: () => onTap(0),
          ),
          NavBarItem(
            icon: Icons.calendar_month,
            color: currentIndex == 1 ? Colors.teal : Colors.grey,
            onTap: () => onTap(1),
          ),
          NavBarItem(
            icon: Icons.person,
            color: currentIndex == 2 ? Colors.teal : Colors.grey,
            onTap: () => onTap(2),
          ),
        ],
      ),
    );
  }
}
