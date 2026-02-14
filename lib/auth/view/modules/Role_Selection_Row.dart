import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:salem_app/auth/cubits/auth_cubit.dart';
import 'package:salem_app/auth/view/modules/citizen_button.dart';
import 'package:salem_app/auth/view/modules/employee_button.dart';

class RoleSelectionRow extends StatelessWidget {
  const RoleSelectionRow({super.key, required this.selectRole});
  final Function(String role) selectRole;
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthCubit, AuthState>(
      builder: (context, state) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GestureDetector(
              onTap: () {
                selectRole("citizen");
                context.read<AuthCubit>().setUserType_citizen();
              },
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
              onTap: () {
                selectRole("employee");
                context.read<AuthCubit>().setUserType_employee();
              },
              child: EmployeeButton(),
            ),
          ],
        );
      },
    );
  }
}
