import 'package:flutter/material.dart';
import 'package:salem_app/widgets/welcomesPage_widgets/citizen_button.dart';
import 'package:salem_app/widgets/welcomesPage_widgets/employee_button.dart';

class RoleSelectionRow extends StatelessWidget {
  const RoleSelectionRow({super.key, required this.selectRole});
  final Function(String role) selectRole;
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        GestureDetector(
          onTap: () => selectRole("citizen"),
          child: CitizenButton(),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'OR',
            style: TextStyle(
              color: Colors.black,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        GestureDetector(
          onTap: () => selectRole("employee"),
          child: EmployeeButton(),
        ),
      ],
    );
  }
}
