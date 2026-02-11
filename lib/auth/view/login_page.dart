import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:salem_app/auth/cubits/auth_cubit.dart';
import 'package:salem_app/auth/view/SignUp_page.dart';
import 'package:salem_app/auth/modules/customForm_textField.dart';
import 'package:salem_app/auth/modules/have_or_not_anAccount.dart';
import 'package:salem_app/auth/modules/login_button.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Color(0xff1B4374)),
        centerTitle: true,
        title: Text(
          'Log In',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w700,
            color: Color(0xff1B4374),
          ),
        ),
      ),
      body: BlocListener<AuthCubit, AuthState>(
        listener: (context, state) {
          if (state is AuthAuthenticated) {
            if (state.role == 'citizen') {
              Navigator.pushReplacementNamed(context, 'citizen');
            } else if (state.role == 'employee') {
              Navigator.pushReplacementNamed(context, 'employee');
            }
          } else if (state is AuthError) {
            ScaffoldMessenger.of(
              context,
            ).showSnackBar(SnackBar(content: Text(state.message)));
          }
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomFormTextfield(hintText: 'Email', controller: emailController),
              const SizedBox(height: 20),
              CustomFormTextfield(hintText: 'Password', obscureText: true, controller: passwordController),
              const SizedBox(height: 60),
              BlocBuilder<AuthCubit, AuthState>(
                builder: (context, state) {
                  if (state is AuthLoading) {
                    return CircularProgressIndicator();
                  }
                  return GestureDetector(
                    onTap: () {
                      context.read<AuthCubit>().login(emailController.text, passwordController.text);
                    },
                    child: LoginButton(width: 200),
                  );
                },
              ),
              const SizedBox(height: 20),
              HaveOrNotAnaccount(
                promptText: 'Dont have an account ',
                actionText: 'Sign Up',
                onActionTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return SignupPage();
                      },
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
