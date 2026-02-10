import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';

class CustomFormTextfield extends StatelessWidget {
  final String? hintText;
  final int? maxLines;
  final TextEditingController? controller;
  final Function(String)? onChanged;
  final bool obscureText;

  const CustomFormTextfield({
    super.key,
    this.hintText,
    this.maxLines,
    this.controller,
    this.onChanged,
    this.obscureText = false,
  });

  @override
  Widget build(BuildContext context) {
    final int effectiveMaxLines = obscureText ? 1 : (maxLines ?? 1);

    return TextFormField(
      controller: controller,
      maxLines: effectiveMaxLines,
      style: const TextStyle(color: Colors.black),
      obscureText: obscureText,
      onChanged: onChanged,
      textInputAction: TextInputAction.next,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: const TextStyle(color: kPrimaryColor),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: kPrimaryColor),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: kPrimaryColor),
        ),
      ),
      validator: (value) {
        if (value == null || value.trim().isEmpty) {
          return 'Field is required';
        }
        return null;
      },
    );
  }
}
