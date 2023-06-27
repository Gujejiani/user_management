# User Management

## Basic Guide

This project utilizes the following technologies and practices:

- Node.js: The backend is built with Node.js and MongoDB. The backend is hosted on Heroku, so there's no need to run it locally. Simply start the local project.
- Angular Material: The project uses Angular Material for UI elements, providing a set of pre-built components and styles for a cohesive and responsive user interface.
- NgRx Store with Entity Pattern: The application utilizes NgRx Store, a state management library for Angular, following the entity pattern. This pattern simplifies managing collections of data and provides efficient CRUD operations.
- Standalone Component: The project includes standalone components that can be reused across different parts of the application, promoting code modularity and reusability.
- Lazy Loading: The application utilizes lazy loading to optimize performance and load only the required modules when navigating to different routes, improving initial loading time.

## Getting Started

Follow the instructions below to set up and run the project locally:

1. Clone the repository: `git clone <repository_url>`
2. Install the dependencies: `npm install`
3. Start the local development server: `npm start`
4. Open the application in your browser: `http://localhost:4200`






**მომხმარებლების ბონუსები**

მომხმარებლის მოდელი (ყველა ველი სავალდებულოა):

- მომხმარებლის იდენტიფიკატორი (უნიკალური, სავალდებულო)
- სახელი (მინ-2 მაქს-50 სიმბოლო, უნდა შედგებოდეს მხოლოდ ლათინური სიმბოლოებისაგან)
- გვარი (მინ-2 მაქს-50 სიმბოლო, უნდა შედგებოდეს მხოლოდ ლათინური სიმბოლოებისაგან)
- სქესი (მნიშვნელობები: ქალი, კაცი)
- პირადი ნომერი (მხოლოდ 11 ციფრი)
- მობილური (9 ციფრი)
- მისამართი (ტექსტური)
- ფოტოსურათი (კარგი იქნება რომ გავაკეთოთ)

ბონუსის მოდელი:

- ბონუსის ნომერი (სავალდებულოა, უნიკალური)
- მომხმარებლის ნომერი (სავალდებულოა, უნიკალური, მთელი რიცხვი)
- ბონუსის ტიპი (სავალდებულოა, დასაშვები მნიშვნელობები: Freespin, Freebet, Money)
- ბონუსის რაოდენობა (სავალდებულო, მთელი რიცხვი)
- ვალუტა (სავალდებულოა და მიეთითოს მხოლოდ მაშინ როცა ტიპი არის Money, დასაშვები მნიშვნელობები: GEL, USD)

ამოცანა:

- უნდა შევქმნათ ანგულარ აპლიკაცია შემდეგი ფუნქციონალით:
- მომხმარებლის დამატება და წაშლა
- მომხმარებლის რედაქტირება (კარგი იქნება რომ გავაკეთოთ)
- მომხმარულის დეტალური ნახვა (მომხმარებლის ბონუსების სიის ჩათვლით)
- მომხმარებლების სიის ნახვა paging-ის შესაძლებლობით
- მომხმარებლების სიის ნახვა ფილტრაციის (მარტივი და დეტალური) და სორტირების შესაძლებლობით (კარგი იქნება რომ გავაკეთოთ)
- მომხმარებელზე ბონუსის დამატება. მომხმარებელზე შეიძლება დაემატოს რამდენიმე სხვადასხვა ტიპის ბონუსი.
- მომხმარებელზე ბონუსის გაუქმება.
- ყველა ოპერაციის შესრულების დროს უნდა მოხდეს შესაბამისი მონაცემების სტრუქტურის და მთლიანობის ვალიდაცია. შეცდომის შემთხვევაში შესაბამისი მესიჯის დაბრუნება.
- ყველა ოპერაციის შესრულების დროს უნდა მოხდეს backend სერვისის გამოძახება, http პროტოკოლით. backend-ის არჩევანი თავისუფალია (JSON Server, Memory Server და ა.შ).
- Backend-ის API-ის მისამართი უნდა იყოს გაწერილი კონფიგურაციის ფაილში
- სიის სორტირების, ფილტრაციის და paging-ის პარამეტრების შენარჩუნება გვერდის refresh-ის შემთხვევაში, რათა სიაში refresh-მდე მდგომარეობით გამოჩნდეს მონაცემები (კარგი იქნება რომ გავაკეთოთ)

აუცილებელი მოთხოვნები:

- აპლიკაცია უნდა დაიწეროს Angular 8+
- ფორმების აწყობა უნდა მოხდეს Reactive Forms-ის მეშვეობით
- შესაძლებელია მზა კომპონენტების გამოყენება, მაგ.: Kendo UI for Angular, Material UI და ა.შ.
- პროექტი დაფუშეთ ამავე Repository-ში.

შეფასებისას მიექცევა ყურადღება:

- გამართული UX / UI
- ანგულარ ანიმაციების გამოყენება
- Redux-ს პატერნის გამოყენება
- Resolver-ების და Guard-ების გამოყენება
- Reusable ელემენტების დაწერა და გამოყენება
