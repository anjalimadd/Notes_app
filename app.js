

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#addBtn");
    const main = document.querySelector("#main");

    console.log("Event listener attached");

    addBtn.addEventListener("click", () => {
        console.log("Button clicked");
        addNote();
    });

    const saveNotes = () => {
        const notes = document.querySelectorAll(".note textarea");
        console.log(notes);
        const data = [];
        notes.forEach(
            (note) => {
                data.push(note.value);
            }
        );

        if (data.length === 0) {
            localStorage.removeItem("notes");
        } else {
            localStorage.setItem("notes", JSON.stringify(data));
        }
    };

    const colors = ['#B2D3ED', '#CEEAD6', '#FEEFC3', '#FAD2CF', '#F1F3F4'];

    const addNote = (text = "") => {
        const note = document.createElement("div");
        note.classList.add("note");

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        note.innerHTML = `
        <div class="tool">
             <i class="save fas fa-save"></i>
             <i class="trash fas fa-trash"></i> 
        </div>
        <textarea style="background-color: ${randomColor};">${text}</textarea>
        `;

        note.querySelector(".trash").addEventListener(
            "click",
            function() {
                note.remove();
                saveNotes();
            }
        );

        note.querySelector(".save").addEventListener(
            "click",
            function() {
                saveNotes();
            }
        );

        note.querySelector("textarea").addEventListener(
            "focusout",
            function() {
                saveNotes();
            }
        );

        main.appendChild(note);
        saveNotes();
    };

    (function () {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote();
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote);
                }
            );
        }
    })();
});
