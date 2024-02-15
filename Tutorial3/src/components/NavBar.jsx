/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T3 - CSCI4177
 * ------------------------------------------------------
 */

export const NavBar = () => {
    return (
        <div class="navbar-container">
            <div class="left-group">
                {/* Link and logo for the home page  */}
                <a href="/" class="logo-link">
                    <div class="logo">Culinary Explorer &#127860;</div>
                </a>
                {/* About redirection  */}
                <div class="dropdown">
                    <a href="/"><span class="highlight">About</span></a>
                </div>
                {/* Dropdown menu for the "Meals" section  */}
                <div class="dropdown">
                    <span onclick="toggleDropdown('meals')">Meals</span>
                    <div class="dropdown-content" id="meals">
                        <a href="/">Breakfast</a>
                        <a href="/">Lunch</a>
                        <a href="/">Dinner</a>
                    </div>
                </div>
                {/* Dropdown menu for the "Snacks" section  */}
                <div class="dropdown">
                    <span onclick="">Snacks</span>
                </div>
                {/* Dropdown menu for the "Drinks" section  */}
                <div class="dropdown">
                    <span onclick="">Drinks</span>
                </div>
            </div>
            {/* User portal functionalities */}
            <div class="right-group">
                <div class="dropdown">
                        <a href="/">Profile</a>
                        &emsp;&emsp;&emsp;
                        <a href="/">Logout</a>
                </div>
            </div>
        </div>
    )
}