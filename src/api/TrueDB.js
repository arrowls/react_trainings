export default class TrueDB {
    static init() {
        if (!localStorage.getItem('trainings')) {
            localStorage.setItem('trainings', '[]');
        }
    }

    static set(date, km) {
        const db = JSON.parse(localStorage.getItem('trainings')) || [];
        if (this.has(date)) {
            const el = db.find((item) => item.date === date);
            el.km += +km;
        } else {
            db.push({date, km: +km });
        }
        localStorage.setItem('trainings', JSON.stringify(db));
    }

    static has(date) {
        const db = JSON.parse(localStorage.getItem('trainings')) || [];
        return db.some((el) => el.date === date);
    }

    static get(date) {
        const db = JSON.parse(localStorage.getItem('trainings')) || [];
        if (!date) return db;
        return db.find((el) => el.date === date);
    }

    static delete(date) {
        let db = JSON.parse(localStorage.getItem('trainings')) || [];
        db = db.filter((el) => el.date !== date);
        localStorage.setItem('trainings', JSON.stringify(db));
    }
}
