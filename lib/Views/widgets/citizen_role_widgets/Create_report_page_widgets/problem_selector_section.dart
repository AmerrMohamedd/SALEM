import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';
import 'problem_card.dart';
import 'package:salem_app/Views/widgets/common_widgets/section_title.dart';

class ProblemsSelectorSection extends StatelessWidget {
  final String? selectedProblem;
  final Function(String) onProblemSelected;

  const ProblemsSelectorSection({
    super.key,
    required this.selectedProblem,
    required this.onProblemSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionTitle(
          title: 'What are you reporting',
          color: kPrimaryColor,
        ),
        const SizedBox(height: 8),

        Row(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(right: 6),
                child: ProblemCard(
                  text: 'صرف',
                  image: 'assets/images/water-drop.png',
                  isSelected: selectedProblem == 'صرف',
                  onTap: () => onProblemSelected('صرف'),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 3),
                child: ProblemCard(
                  text: 'كهرباء',
                  image: 'assets/images/flash.png',
                  isSelected: selectedProblem == 'كهرباء',
                  onTap: () => onProblemSelected('كهرباء'),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 3),
                child: ProblemCard(
                  text: 'طرق',
                  image: 'assets/images/road.png',
                  isSelected: selectedProblem == 'طرق',
                  onTap: () => onProblemSelected('طرق'),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(left: 6),
                child: ProblemCard(
                  text: 'اخري',
                  image: 'assets/images/danger.png',
                  isSelected: selectedProblem == 'اخري',
                  onTap: () => onProblemSelected('اخري'),
                ),
              ),
            ),
          ],
        ),

        const SizedBox(height: 8),
        const Padding(
          padding: EdgeInsets.only(left: 10),
          child: Text(
            'If answering “Other”, please provide details in the description.',
            style: TextStyle(fontSize: 14),
          ),
        ),
      ],
    );
  }
}
