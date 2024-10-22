# DECO7140

Repository for DECO7140 project and studio practices.

![](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGE2MHg2anRrdnhxMnQyaTFndnBmbnN6bGpvcXYxczh5ZTU1bnc4NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/aNqEFrYVnsS52/200.webp)

### Visit the website

[UQCloud (Login)](https://deco7140-9476f1e5.uqcloud.net/)
or
[Vercel](https://deco-7140.vercel.app/)

## Setup

1. Clone the repository
2. Install the dependencies with `npm install`

## Assets and Resources

#### Homepage

- [Compass asset used in hero](https://www.shutterstock.com/nb/image-vector/compass-icons-set-vector-vectors-2468768179)
- [Single Backpacker asset used in hero](https://www.shutterstock.com/nb/image-vector/single-backpacker-traveler-hiker-bring-bag-2503906333)
- [Hero Image](https://www.shutterstock.com/nb/image-photo/travel-travelwoman-solo-traveling-alonedigital-nomadbleisurework-2508261587)
- [Destinations CTA](https://www.shutterstock.com/nb/image-photo/person-walking-grassy-hill-mountains-under-2474842457)
- [Community CTA](https://www.shutterstock.com/nb/image-photo/man-waiting-his-son-rappels-down-1023960841)
- [Recommedation CTA](https://www.shutterstock.com/nb/image-photo/traveler-woman-relaxing-on-swing-above-2130878285)
- [Add Bookmark CTA](https://www.shutterstock.com/nb/image-photo/saving-money-investment-future-senior-adult-2495629229)

#### Database Schema

**Destinations**
`product_owner`: `string` - "destinations;root"
`country` at `product_info1`: `string` - Name of Country
`filters` at `product_info2`: `string` - "sustainable;adventure;beach;history;nature;city;family;kids"
`sustainability_rating` at `product_info3`: `int` - Intager from 1 to 3

**Community**
`product_owner`: `string` - "community;User Name"
`filters`: `string` - "sustainable;adventure;beach;history;nature;city;family;kids"
