export const GET_FAVORITES = 'GET_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES';

// getting the favorite state...
export function GETFavoriteState() {
    const action = {
        type:GET_FAVORITES
    }
    return action;
}

// Add Data to are favorites list...
export function AddToFavorite(item) {
    const action = {
        type: ADD_TO_FAVORITES,
        payload: item
    }
    return action;
}

// Delete from our list...
export function DeleteFromFavorite(item) {
    const action = {
        type: DELETE_FROM_FAVORITES,
        payload: item
    }
    return action;
    
}