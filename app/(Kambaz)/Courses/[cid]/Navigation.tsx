"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams();
  const cid = params.cid as string;

 const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Piazza" },
    { label: "Zoom", path: "Zoom" },
    { label: "Assignments", path: "Assignments" },
    { label: "Quizzes", path: "Quizzes" },
    { label: "Grades", path: "Grades" },
    { label: "People", path: "People/Table" }
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link 
          key={link.label}
          href={`/Courses/${cid}/${link.path}`}
          id={`wd-course-${link.label.toLowerCase()}-link`}
          className={`list-group-item border-0 ${
            pathname.includes(link.label) ? "active" : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
 
);}
