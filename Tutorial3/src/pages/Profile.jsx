import { useContentLoader } from '../js/useContentLoader.js';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T3 - CSCI4177
 * ------------------------------------------------------
 */

export const Profile = () => {
    useContentLoader();

    return (
        <div className="container">
            <div className="content">
                <div class="profile">
                    <h1>John Smith</h1>
                    <p>johnsmith@dal.ca</p>
                </div>
            </div>
        </div>
    )
}