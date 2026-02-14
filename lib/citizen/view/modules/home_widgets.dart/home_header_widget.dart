import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:salem_app/auth/cubits/auth_cubit.dart';
import 'package:salem_app/core/Constants.dart';
import 'package:salem_app/citizen/view/Citizen_Notifications_page.dart';

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
            children: [
              Text(
                "Hi, Welcome Back",
                style: TextStyle(color: Colors.teal, fontSize: 14),
              ),
              BlocBuilder<AuthCubit, AuthState>(
                builder: (context, state) {
                  return Text(
                    context.read<AuthCubit>().currentUser?.username ?? "User",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  );
                },
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
