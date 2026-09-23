let editor;

window.require.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
    }
});

window.require(
    ["vs/editor/editor.main"],
    function () {

        editor = monaco.editor.create(
            document.getElementById("editor"),
            {

                value:
`public class Main {

    public static void main(String[] args) {

        System.out.println("Hello PrepConnect");

    }

}`,

                language: "java",

                theme: "vs-dark",

                automaticLayout: true,

                fontSize: 16,

                minimap: {
                    enabled: false
                }

            }
        );

        console.log("Monaco Editor Loaded ✅");

    }
);