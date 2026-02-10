import 'package:flutter/material.dart';

class LoadMoreSection extends StatelessWidget {
  final int currentCount;
  final int totalCount;
  final VoidCallback onLoadMore;

  const LoadMoreSection({
    super.key,
    required this.currentCount,
    required this.totalCount,
    required this.onLoadMore,
  });

  @override
  Widget build(BuildContext context) {
    final bool canLoadMore = currentCount < totalCount;

    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 4,
      ), // خففنا ال vertical
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '$currentCount / $totalCount',
            style: const TextStyle(fontSize: 14), // صغرنا حجم النص
          ),
          TextButton(
            onPressed: canLoadMore ? onLoadMore : null,
            style: TextButton.styleFrom(
              padding: EdgeInsets.zero, // قللنا padding داخل الزر
              minimumSize: const Size(50, 30), // الحد الأدنى للزر
              tapTargetSize:
                  MaterialTapTargetSize.shrinkWrap, // تقليل حجم الـ tap area
            ),
            child: Text(
              'Load More',
              style: TextStyle(
                color: canLoadMore ? Colors.teal : Colors.grey,
                fontWeight: FontWeight.bold,
                fontSize: 14, // صغرنا حجم النص
              ),
            ),
          ),
        ],
      ),
    );
  }
}
