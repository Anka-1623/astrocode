import re

with open('js/game.js', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = [
    (r"GÖNDEREN: TUA Merkez\\nKONU: Acil İnceleme", r"' + T('GÖNDEREN: TUA Merkez\\nKONU: Acil İnceleme') + '"),
    (r"Sevgili Emirhan,\\nSon analizlerimizde bazı anomaliler tespit ettik.\\nLütfen ekteki verileri incele.", r"' + T('Sevgili Emirhan,\\nSon analizlerimizde bazı anomaliler tespit ettik.\\nLütfen ekteki verileri incele.') + '"),
    (r"KABUL ET VE İNCELE", r"' + T('KABUL ET VE İNCELE') + '"),
    
    (r"Sevgili Gözde,\\nRoket sistemimizde son kontrolleri yapman gerekiyor.\\nLütfen ekteki diyagramı incele.", r"' + T('Sevgili Gözde,\\nRoket sistemimizde son kontrolleri yapman gerekiyor.\\nLütfen ekteki diyagramı incele.') + '"),
    (r"KABUL ET VE GÖZ AT", r"' + T('KABUL ET VE GÖZ AT') + '"),
    
    (r"GÖZDE\\n\(Uzay Mühendisi\)", r"' + T('GÖZDE\\n(Uzay Mühendisi)') + '"),
    (r"EMİRHAN\\n\(Gezegen Bilimcisi\)", r"' + T('EMİRHAN\\n(Gezegen Bilimcisi)') + '"),
    
    (r"Tebrik ederim! Cok guzel is cikardin!", r"'+T('Tebrik ederim! Cok guzel is cikardin!')+'"),
    (r"Maalesef yanlis eslestirdin, bence tekrar dene", r"'+T('Maalesef yanlis eslestirdin, bence tekrar dene')+'"),
    (r"Aferin! Simdi diger etaba gec.", r"'+T('Aferin! Simdi diger etaba gec.')+'"),
    (r"Parcalar uyumsuz lutfen tekrar dene.", r"'+T('Parcalar uyumsuz lutfen tekrar dene.')+'"),
    (r"HAYDİ SONUÇLARI İNCELEYELİM", r"'+T('HAYDİ SONUÇLARI İNCELEYELİM')+'"),
    (r"! UYDU YORUNGEDEN CIKIYOR !", r"'+T('! UYDU YORUNGEDEN CIKIYOR !')+'"),
    (r"Oyun Bitti, Düştün!", r"'+T('Oyun Bitti, Düştün!')+'"),
    (r"Aferin butun asamalari basariyla gectin kendine iyi bak!", r"'+T('Aferin butun asamalari basariyla gectin kendine iyi bak!')+'"),
    (r"Iste bu! Tebrik ederim. Gercekten cok guzel oldu.", r"'+T('Iste bu! Tebrik ederim. Gercekten cok guzel oldu.')+'"),
    (r"Maalesef parcalar uyumlu degil tekrar dene.", r"'+T('Maalesef parcalar uyumlu degil tekrar dene.')+'"),
    (r"Oyunun sonuna geldiniz. Oynadiginiz Icin Tesekkurler! \(Gelistirme asamasidir...\)", r"'+T('Oyunun sonuna geldiniz. Oynadiginiz Icin Tesekkurler! (Gelistirme asamasidir...)')+'"),
    
    (r"KAYAÇ 1", r"'+T('KAYAÇ 1')+'"),
    (r"KAYAÇ 2", r"'+T('KAYAÇ 2')+'"),
    (r"KAYAÇ 3", r"'+T('KAYAÇ 3')+'")
]

for src, tgt in replacements:
    code = re.sub(src, tgt, code)

# Fix double T's
code = code.replace("T(''+T('", "T('")
code = code.replace("')+'')", "')")

with open('js/game.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Additional replacements done in js/game.js")
