import 'package:flutter/material.dart';
import 'package:salem_app/core/Constants.dart';

class NotificationsPage extends StatelessWidget {
  const NotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  AppBar(
        iconTheme: IconThemeData(color: kPrimaryColor),
        title: ShaderMask(
          shaderCallback:
              (bounds) => const LinearGradient(
                colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
              ).createShader(Rect.fromLTWH(0, 0, bounds.width, bounds.height)),
          child: Text(
            'Notifications',
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold
            ),
          ),
        ), centerTitle: true),
      body: const Center(
        child: Text('No notifications yet', style: TextStyle(fontSize: 18)),
      ),
    );
  }
}
