import { FC, useEffect, useState } from "react";
import Loading from "src/client/component/Loading";
import Editor from "src/client/component/Editor";
import { useEditor } from "src/client/hook/useEditor";
import { mockQuiz } from "src/server/service/Game";
import { Quiz } from "src/server/types/Quiz";

const QuizForm: FC = () => {
  const [status, setStatus] = useState<"saved" | "unsaved" | "loading">(
    "saved"
  );
  const [quiz, editorFactory, setQuiz] = useEditor<Quiz | null>(mockQuiz);

  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  if (status === "loading" || quiz == null) return <Loading />;

  return (
    <main className="bg-b absolute inset-0 flex flex-col gap-4 p-4">
      <h1 className="text-white font-bold text-3xl text-left w-full">
        Quiz editor
      </h1>
      <div className="flex flex-row">
        <div className="flex-1">
          <Editor label="Title" {...editorFactory<string>(quiz, "title")} />

          <Editor<number>
            type="number"
            label="Default time for question (seconds)"
            {...editorFactory<number>(quiz, "defaultTime")}
          />
        </div>

        <div className="flex-1"></div>
      </div>
    </main>
  );
};

export default QuizForm;
