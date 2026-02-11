import 'package:flutter/material.dart';
import 'package:salem_app/Views/employee_pages/employee_home_page.dart';
import 'package:salem_app/Views/employee_pages/employee_myProfile_page.dart';
import 'package:salem_app/Views/employee_pages/employee_myTsaks_page.dart';
import 'package:salem_app/Views/widgets/citizen_role_widgets/home_widgets.dart/Custom_Bottom_Navigation_Bar.dart';

class EmployeeMainPage extends StatefulWidget {
  const EmployeeMainPage({super.key});

  @override
  State<EmployeeMainPage> createState() => _EmployeeMainPageState();
}

class _EmployeeMainPageState extends State<EmployeeMainPage> {
  int currentIndex = 0;

  final pages =  [
    EmployeeHomePage(),
    EmployeeMyTasksPage(),
    EmployeeMyprofilePage(),
  ];

  void onNavTap(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: currentIndex,    
        children: pages,      
      ),
      bottomNavigationBar: CustomBottomNavigationBar(
        currentIndex: currentIndex,
        onTap: onNavTap,
      ),
    );
  }
}

