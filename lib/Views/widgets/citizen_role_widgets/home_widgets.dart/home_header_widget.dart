import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';
import 'package:salem_app/Views/citizen_pages/Citizen_Notifications_page.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const CircleAvatar(
          radius: 28,
          backgroundImage: AssetImage(
            "assets/images/WhatsApp Image 2025-12-11 at 17.47.18_d1be141c.jpg",
          ),
        ),
        const SizedBox(width: 12),

        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                "Hi, Welcome Back",
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
        ),

        IconButton(
          icon: const Icon(Icons.notifications, size: 26),
          color: kPrimaryColor,
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const NotificationsPage(),
              ),
            );
          },
        ),

        IconButton(
          icon: const Icon(Icons.settings, size: 26),
          color: kPrimaryColor,
          onPressed: () {},
        ),
      ],
    );
  }
}
