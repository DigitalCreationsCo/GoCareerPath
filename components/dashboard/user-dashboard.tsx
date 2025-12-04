"use client";
import { Report } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';

interface UserDashboardProps {
  report: Report;
}

export function UserDashboard({ report }: UserDashboardProps) {
  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 rounded-lg shadow-inner">
        <p className="text-lg font-semibold text-gray-700">No career report found.</p>
        <p className="mt-2 text-gray-500">
          To get started, please{" "}
          <Link href="/chat" className="text-blue-600 hover:underline">
            generate a new report
          </Link>{" "}
          by chatting with our AI assistant.
        </p>
      </div>
    );
  }

  const bestPath = report.suggestions.find(s => s.title === report.metadata.best_path) || report.suggestions[0];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Job Fit Score</h2>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                className="text-gray-200"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.8"
              />
              <path
                className="text-blue-600"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.8"
                strokeDasharray={`${bestPath.score_breakdown.final * 100}, 100`}
              />
            </svg>
          </div>
          <div>
            <p className="text-4xl font-bold">{(bestPath.score_breakdown.final * 100).toFixed(0)}%</p>
            <p className="text-gray-500">Match for {bestPath.title}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Live Skill Gaps</h2>
        <div className="space-y-4">
          {bestPath.missing_skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <p className="font-semibold">{skill.skill}</p>
                <p className="text-sm text-gray-500">{skill.estimated_learning_hours} hrs</p>
              </div>
              <p className="text-sm text-gray-600">{skill.why_it_matters}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Learning Path</h2>
        <ul className="space-y-3">
          {bestPath.missing_skills.map((skill, index) => (
            <li key={index} className="flex items-center p-3 transition-all duration-200 bg-gray-100 rounded-md hover:bg-gray-200">
              <div className="mr-3">
                <span className="text-sm font-medium text-white bg-blue-600 rounded-full size-6 flex-center">{index + 1}</span>
                <span className="text-sm font-medium text-white bg-blue-600 rounded-full size-6 flex-center">{skill.skill}</span>
                <span className="text-sm font-medium text-white bg-blue-600 rounded-full size-6 flex-center">{skill.estimated_learning_hours}</span>
                <span className="text-sm font-medium text-white bg-blue-600 rounded-full size-6 flex-center">{skill.why_it_matters}</span>
              </div>
              { skill.resources.map((resource, resourceIndex) =>
                (<div key={`${skill.skill}_resource_${resourceIndex}`}>
                <p className="font-semibold">{resource.title}</p>
                <p className="text-sm text-gray-500">{resource.type}</p>
              </div>)
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
