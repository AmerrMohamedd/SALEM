import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Row(
        children: [
          CircleAvatar(
            radius: 28,
            backgroundImage: AssetImage(
              "assets/images/WhatsApp Image 2025-12-11 at 17.47.18_d1be141c.jpg",
            ),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                "Hi, WelcomeBack",
                style: TextStyle(color: Colors.teal, fontSize: 14),
              ),
              Text(
                "John Doe",
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const Spacer(),
          Icon(Icons.notifications, color: kPrimaryColor, size: 26),
          const SizedBox(width: 10),
          Icon(Icons.settings, color: kPrimaryColor, size: 26),
        ],
      ),
    );
  }
}
