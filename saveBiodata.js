const fs = require('fs');

const biodata = {
    name: "Irfan Fauzi",
    origin: "Boyolali",
    occupation: "Mahasiswa",
    education: {
        program: "D4 Teknologi Rekayasa Perangkat Lunak",
        university: "Universitas Gadjah Mada"
    },
    skills: [
        "Pemrograman",
        "Pengembangan Perangkat Lunak",
        "Analisis Sistem",
        "Pengembangan Aplikasi Mobile",
        "Pengembangan Aplikasi Web"
    ],
    hobbies: [
        "Coding",
        "Membaca buku teknologi",
        "Mencoba teknologi baru",
        "Bermain game"
    ],
    goals: [
        "Menjadi software engineer profesional",
        "Mengembangkan aplikasi yang bermanfaat",
        "Berkontribusi pada proyek open-source"
    ],
    favorite_quote: "Belajar tanpa berpikir itu tidaklah berguna, tapi berpikir tanpa belajar itu sangatlah berbahaya. - Confucius"
};

fs.writeFile('biodata.json', JSON.stringify(biodata, null, 2), (err) => {
    if (err) throw err;
    console.log('Biodata has been saved!');
});
