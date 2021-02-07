Back-end Node.js
============================

=============================================
1. Simple Database querying<br/>
    Terdapat sebuah table "USER" yg memiliki 3 kolom: ID, UserName, Parent. Di mana:<br/>
    Kolom ID adalah Primary Key<br/>
    Kolom UserName adalah Nama User<br/>
    Kolom Parent adalah ID dari User yang menjadi Creator untuk User tertentu. eg.<br/>
    ——————————————————————————<br/>
    | ID | UserName | Parent |<br/>
    ——————————————————————————<br/>
    | 1 | Ali | 2 |<br/>
    | 2 | Budi | 0 |<br/>
    | 3 | Cecep | 1 |<br/>
    —————————————————————————-<br/>
    Tuliskan SQL Query untuk mendapatkan data berisi:<br/>
    ———————————————————————————————————————————<br/>
    | ID | UserName | ParentUserName |<br/>
    ———————————————————————————————————————————<br/>
    | 1 | Ali | Budi |<br/>
    | 2 | Budi | NULL |<br/>
    | 3 | Cecep | Ali |<br/>
    ——————————————————————————————————<br/>
    *Kolom ParentUserName adalah UserName berdasarkan value Parent<br/>

    Answer:
        => SELECT a.ID, a.UserName, b.UserName FROM USER a LEFT JOIN USER b on a.Parent = b.ID order by a.UserName asc
=================================================

=================================================<br/>
2. Please write a small ExpressJS server to search movies from<br/>
    http://www.omdbapi.com/<br/>
    The Backend should :<br/>
    - Have 2 endpoint named "/search" with GET method and "/detail" with GET method<br/>
    (single movie detail)<br/>
    Each API calls should be logged into a MySQL table, specifying DateTime, API<br/>
    endpoint getting called and the parameters passed<br/>
    - Contain access credential to call the API as such :<br/>
    Key : "faf7e5bb&s"<br/>
    URL : http://www.omdbapi.com/<br/>
    * Example url call to search is --> GET<br/>
    http://www.omdbapi.com/?apikey=faf7e5bb&s=Batman&page=2<br/>
    - Be written in ExpressJS framework<br/>
    Important aspects :<br/>
    - Readability of code<br/>
    - Good display on the knowledge of "Separation of Concerns for Codes"<br/>
    - Write unit tests on some of the important files. Bigger plus points for complete unit<br/>
    test cases<br/>
    - Good use of asynchronousy<br/>
    Plus points:<br/>
    - Deploy your result to a public URL so we can check the result<br/>
    - Implementation of Clean Architecture is a BIG plus<br/>
    - Complete Unit tests<br/>

    Answer:
        live demo: 
            database: 
                postgresql
            url:
                https://api.irithel.my.id:3000/bibit/search?s=Batman&page=1
                https://api.irithel.my.id:3000/bibit/detail/tt0372784?plot=short
        local:
            database:
                mysql
            url:
                http://localhost:3000/api/v1/search?s=Batman&page=1
                http://localhost:3000/api/v1/detail/tt0372784?plot=short
    config: 
        database config : /MovieTracking/src/infrastructure/config.js

=================================================

=================================================<br/>
3. Please refactor the code below to make it more concise, efficient and readable with good logic flow.
    Code :
        function findFirstStringInBracket(str) {
            if (str.length > 0) {
                let indexFirstBracketFound = str.indexOf("(");
                if (indexFirstBracketFound >= 0) {
                let wordsAfterFirstBracket = str.substr(indexFirstBracketFound);
                if (wordsAfterFirstBracket) {
                    wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
                    let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")");
                    if (indexClosingBracketFound >= 0) {
                    return wordsAfterFirstBracket.substring(0,
                        indexClosingBracketFound);
                    }
                    else {
                    return '';
                    }
                } else {
                    return '';
                }
                } else {
                return '';
                }
            } else {
                return '';
            }
        }

    Answer:
        => function findFirstStringInBracket(str){
                const indexFirstBracketFound = str.indexOf("(");
                const strAfterSlice = str.substring(indexFirstBracketFound, str.length)
                const indexClosingBracketFound = strAfterSlice.indexOf(")");
                if(indexFirstBracketFound>-1 && indexClosingBracketFound>-1 && indexClosingBracketFound!=1){
                    return strAfterSlice.substring(indexFirstBracketFound, indexClosingBracketFound);
                }
                return '';
            } 
=================================================

=================================================<br/>
4. Logic Test<br/>
    Anagram adalah istilah dimana suatu string jika dibolak balik ordernya maka akan<br/>
    sama eg. 'aku' dan 'kua' adalah Anagram, 'aku' dan 'aka' bukan Anagram.<br/>
    Dibawah ini ada array berisi sederetan Strings.<br/>
    ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']<br/>
    Silahkan kelompokkan/group kata-kata di dalamnya sesuai dengan kelompok<br/>
    Anagramnya,<br/>
    Catatan: tidak boleh menggunakan syntax es6 map, reduce, find, filter<br/>
    # Expected Outputs<br/>
    [<br/>
    ["kita", "atik", "tika"],<br/>
    ["aku", "kua"],
    ["makan"],<br/>
    ["kia"]<br/>
    ]<br/>

    Answer:
    => function findAnagrams(list){
        let anagrams = {}
        let tempAnagrams  = []
        for (let word of list){
            let letters = word.split('').sort().join('')
            anagrams[letters] = anagrams[letters] || []
            anagrams[letters].push(word)
        }
        for (let key in anagrams){
            tempAnagrams.push(anagrams[key])
        }
        return tempAnagrams
    }
=================================================