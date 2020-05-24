export type GetItemType = (key: string) => Promise<string>;
export type SetItemType = (key: string, value: string) => Promise<boolean>
export type RemoveItemType = (key: string) => Promise<boolean>

class SessionStorage {
    getItem: GetItemType = (key) => new Promise((resolve, reject) => {
        try {
            const value: string = sessionStorage.getItem(key);
            resolve(value);
        } catch (error) {
            console.error(error);
            reject('');
        }
    });

    setItem: SetItemType = (key, value) => new Promise((resolve, reject) => {
        try {
            sessionStorage.setItem(key, value);
            resolve(true);
        } catch (error) {
            console.error(error);
            reject(false);
        }
    })

    removeItem: RemoveItemType = (key) => new Promise((resolve, reject) => {
        try {
            sessionStorage.removeItem(key);
            resolve(true);
        } catch (error) {
            console.error(error);
            reject(false);
        }
    })
}

export const store = new SessionStorage();
