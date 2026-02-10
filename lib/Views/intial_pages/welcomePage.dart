import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';
import 'package:salem_app/widgets/welcomesPage_widgets/AuthActions_Column.dart';
import 'package:salem_app/widgets/welcomesPage_widgets/Logo_widget.dart';
import 'package:salem_app/widgets/welcomesPage_widgets/Role_Selection_Row.dart';
import 'package:salem_app/widgets/welcomesPage_widgets/left_sideGradient.dart';
import 'package:salem_app/widgets/welcomesPage_widgets/right_sideGradient.dart';

class Welcomepage extends StatefulWidget {
  const Welcomepage({super.key});

  @override
  State<Welcomepage> createState() => _WelcomepageState();
}

class _WelcomepageState extends State<Welcomepage> {
  String? userRole;
  void onRoleSelected(String role) {
    setState(() {
      userRole = role;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          const LeftSideGradient(),
          const RightSidegradient(),

          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              LogoWidget(),
              SizedBox(height: 100),

              AnimatedSwitcher(
                duration: Duration(milliseconds: 350),
                transitionBuilder: (child, animation) {
                  final offsetAnimation = Tween<Offset>(
                    begin: Offset(0, 0.1),
                    end: Offset.zero,
                  ).animate(animation);

                  return SlideTransition(
                    position: offsetAnimation,
                    child: FadeTransition(opacity: animation, child: child),
                  );
                },
                child:
                    userRole == null
                        ? RoleSelectionRow(
                          key: ValueKey('roles'),
                          selectRole: onRoleSelected,
                        )
                        : AuthactionsColumn(
                          key: ValueKey('auth'),
                          role: userRole!,
                        ),
              ),
            ],
          ),

          if (userRole != null)
            Positioned(
              top: 40,
              left: 16, 
              child: IconButton(
                icon: Icon(Icons.arrow_back, size: 28, color: kPrimaryColor),
                onPressed: () {
                  setState(() {
                    userRole = null; 
                  });
                },
              ),
            ),
        ],
      ),
    );
  }
}
