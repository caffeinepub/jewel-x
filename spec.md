# JEWEL X - Product Detail Page Redesign

## Current State
ProductDetail.tsx uses dark luxury theme. It has image gallery, info panel, urgency badge, countdown timer, tabs for description/reviews/care, and related products grid.

## Requested Changes (Diff)

### Add
- White/light background for ProductDetail page only
- Orange/saffron CTA button color matching astrotalk.store
- UPI payment icons (GPay, Paytm, PhonePe) below price
- Cashback banner section
- Pincode delivery estimator
- Trust strip: Cashback on prepaid, FREE Shipping icons
- Customer review carousel
- Accordion sections: Benefits, How to wear, Style tip, Packaging, Returns
- Specifications table at bottom
- Review breakdown bar chart
- Discount badge prominently shown

### Modify
- ProductDetail background to clean white/light cream
- Text colors to dark/black
- Button colors to match reference (dark add-to-cart, orange buy-now)
- Tabs replaced with accordions for product info sections
- Price layout: larger, bolder, clear strikethrough

### Remove
- Dark gradient backgrounds from product info section
- Tab interface (replaced with accordions)

## Implementation Plan
1. Rewrite ProductDetail.tsx with white background and new color scheme
2. Add UPI icons, cashback section, pincode checker
3. Add review carousel
4. Add accordion sections for product info
5. Add specifications table and review breakdown bars
6. Keep all product data, images, urgency badge, countdown timer
