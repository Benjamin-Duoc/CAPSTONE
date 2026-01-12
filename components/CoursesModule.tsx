import React, { useState, useMemo } from 'react';
import type { Course } from '../types';
import { StarIcon, ChevronDownIcon } from './icons';

interface CoursesModuleProps {
    courses: Course[];
    onSelectCourse: (course: Course) => void;
}

const CourseCard: React.FC<{ course: Course; onSelect: () => void; }> = ({ course, onSelect }) => {
  return (
    <button onClick={onSelect} className="w-full text-left bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col border border-gray-200 hover:border-primary">
      <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase text-primary tracking-wide">{course.category}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${course.cost === 'Gratis' ? 'bg-green-100 text-green-800' : 'bg-highlight/20 text-yellow-800'}`}>{course.cost}</span>
        </div>
        <h3 className="font-bold font-serif text-lg text-text-primary mt-2 group-hover:text-primary transition-colors flex-grow">{course.title}</h3>
        <div className="flex items-center mt-4 text-sm text-text-secondary">
            <span className={`px-2 py-1 text-xs rounded ${course.level === 'Básico' ? 'bg-secondary/10 text-secondary' : course.level === 'Intermedio' ? 'bg-accent/20 text-green-800' : 'bg-primary/10 text-primary'}`}>{course.level}</span>
            <span className="mx-2">|</span>
            <span>{course.format}</span>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(course.rating) ? 'text-highlight' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="ml-2 text-text-secondary">({course.reviewCount} reseñas)</span>
        </div>
      </div>
    </button>
  );
};

const FilterDropdown: React.FC<{ label: string; options: string[]; selected: string; onChange: (value: string) => void }> = ({ label, options, selected, onChange }) => {
    return (
        <div className="relative">
            <select
                className="appearance-none w-full bg-surface border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                aria-label={`Filtrar por ${label}`}
            >
                <option value="">Todo {label}</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDownIcon className="h-4 w-4" />
            </div>
        </div>
    );
};


const CoursesModule: React.FC<CoursesModuleProps> = ({ courses, onSelectCourse }) => {
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        format: '',
        cost: ''
    });

    const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            return (filters.category ? course.category === filters.category : true) &&
                   (filters.level ? course.level === filters.level : true) &&
                   (filters.format ? course.format === filters.format : true) &&
                   (filters.cost ? course.cost === filters.cost : true);
        });
    }, [filters, courses]);
    
    const courseCategories = [...new Set(courses.map(c => c.category))];
    const courseLevels = [...new Set(courses.map(c => c.level))];
    const courseFormats = [...new Set(courses.map(c => c.format))];
    const courseCosts = [...new Set(courses.map(c => c.cost))];

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-text-primary">Capacitación para Innovar</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Adquiere las herramientas y conocimientos para liderar en la nueva era de las comunicaciones.</p>
                </div>

                <div className="bg-surface p-4 rounded-lg shadow-lg mb-8 sticky top-24 z-40 border border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FilterDropdown label="Categoría" options={courseCategories} selected={filters.category} onChange={(v) => handleFilterChange('category', v)} />
                        <FilterDropdown label="Nivel" options={courseLevels} selected={filters.level} onChange={(v) => handleFilterChange('level', v)} />
                        <FilterDropdown label="Formato" options={courseFormats} selected={filters.format} onChange={(v) => handleFilterChange('format', v)} />
                        <FilterDropdown label="Costo" options={courseCosts} selected={filters.cost} onChange={(v) => handleFilterChange('cost', v)} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} onSelect={() => onSelectCourse(course)} />
                    ))}
                </div>
                {filteredCourses.length === 0 && (
                    <div className="text-center py-16 bg-surface rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-xl font-semibold text-text-primary">No se encontraron cursos</h3>
                        <p className="text-text-secondary mt-2">Intenta ajustar tus filtros para encontrar lo que buscas.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesModule;