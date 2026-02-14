import 'package:flutter/material.dart';
import 'package:salem_app/core/Constants.dart';

class CustomFormTextfield extends StatelessWidget {
  final String? hintText;
  final int? maxLines;
  final TextEditingController? controller;
  final Function(String)? onChanged;
  final bool obscureText;
  final String type;
  const CustomFormTextfield({
    super.key,
    this.hintText,
    this.maxLines,
    this.controller,
    this.onChanged,
    this.obscureText = false, required this.type,
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
      keyboardType: type == 'email'
          ? TextInputType.emailAddress
          : type == 'phone'
              ? TextInputType.phone
              : type == 'date'
                  ? TextInputType.datetime
                  : TextInputType.text,
          
      validator: (value) {
        if (value == null || value.trim().isEmpty) {
          return 'Field is required';
        }
        return null;
      },
    );
  }
}
