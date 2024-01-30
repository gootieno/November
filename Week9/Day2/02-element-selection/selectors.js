const select = () => {
  /* Write queries for each of the following */

  /* Section 1 */
  // 1. Get all seeded fruit elements
  // Your code here
  const seeded = document.getElementsByClassName("seed");
  console.log("Seeded", seeded);
  // 2. Get all seedless fruit elements
  // Your code here
  const seedlessFruit = document.querySelectorAll(".seedless");
  console.log("seedless fruits", seedlessFruit);
  // 3. Get first seedless fruit element
  // Your code here
  const firstSeedlessFruit = seedlessFruit[0];
  console.log("first seedless fruit ", firstSeedlessFruit);
  /* Section 2 */
  // 4. Get inner span with text "you"
  // Your code here
  const innerSpan = document.getElementById("wrapper");
  const innerSpanYou = innerSpan.querySelector("span");
  console.log("You in the span", innerSpanYou);
  // 5. Get all children of element "wrapper"
  // Your code here
  const wrapperChildren = document.querySelector("#wrapper").children;
  console.log("wrapper children ", wrapperChildren);

  // 6. Get all odd number list items in the list
  // Your code here
  let odd = document.getElementsByClassName("odd");
  console.log('odd ',odd);
  // 7. Get all even number list items in the list
  // Your code here
  const evenListItems = document.querySelectorAll('#two li:not(.odd)');
  console.log(evenListItems);
  /* Section 3 */
  // 8. Get all tech companies without a class name
  // Your code here
  const techCompanies = document.querySelectorAll('#three a:not([class])');
  console.log(techCompanies);
  // 9. Get "Amazon" list element
  // Your code here
  let amazon = document.getElementsByClassName("shopping")
  console.log(amazon)
  // 10. Get all unicorn list elements (not the image element)
  // Your code here
    const unicornListItems = document.body.querySelectorAll('#three > ul > li')
    console.log(unicornListItems)

    const parents = []
    const unicorns = document.querySelectorAll('.unicorn')
    for(const unicorn of unicorns){
        parents.push(unicorn.parentElement)
    }
    console.log('parents ',  parents)
};

window.onload = select;
