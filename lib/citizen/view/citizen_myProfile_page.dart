import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:salem_app/auth/cubits/auth_cubit.dart';
import 'package:salem_app/core/Constants.dart';
import 'package:salem_app/citizen/view/modules/Citizen_myProfile_widgets/Section.dart';

class CitizenMyprofilePage extends StatelessWidget {
  const CitizenMyprofilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: kPrimaryColor),
        centerTitle: true,
        title: ShaderMask(
          shaderCallback:
              (bounds) => const LinearGradient(
                colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
              ).createShader(Rect.fromLTWH(0, 0, bounds.width, bounds.height)),
          child: const Text(
            'My Profile',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      ),
      body: BlocBuilder<AuthCubit, AuthState>(
        builder: (context, state) {
          return Column(
            children: [
              Center(
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 60,
                      backgroundImage: AssetImage(
                        "assets/images/WhatsApp Image 2025-12-11 at 17.47.18_d1be141c.jpg",
                      ),
                    ),
                    Text(
                      context.read<AuthCubit>().currentUser?.username ?? "User",
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 70),
              Section(icon: Icons.person_outlined, title: 'Profile'),
              const SizedBox(height: 20),
              Section(icon: Icons.lock_outline, title: 'Privacy'),
              const SizedBox(height: 20),
              Section(icon: Icons.settings, title: 'Settings'),
              const SizedBox(height: 20),
              Section(icon: Icons.help_outline, title: 'Help Center'),
              const SizedBox(height: 20),
              Section(
                icon: Icons.logout,
                title: 'Logout',
                onPressed: () {
                  context.read<AuthCubit>().logout();
                  Navigator.pushNamedAndRemoveUntil(
                    context,
                    'welcome',
                    (route) => false,
                  );
                },
              ),
            ],
          );
        },
      ),
    );
  }
}
