#!/usr/bin/env python3
import re
import os
import os.path
import csv
import json
import argparse
import requests

JSON_FILE = 'projects.json'
CSV_FILE = 'projects.csv'

def load_projects():
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_projects(projects):
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=4)

def add_cmd(project_id):
    projects = load_projects()

    if project_id in projects:
        print(project_id, 'already exists, will update it.')

    projects[project_id] = generate_project_json(project_id)
    save_projects(projects)
    print('Added', project_id)

def generate_project_json(project_id):
    return {
        'title': get_title(project_id),
        'image': get_image(project_id),
        'image_alt': f'An image showing content related to {project_id}',
        'url': f'https://github.com/Null0Fish/{project_id}',
        'description': get_description(project_id),
        'date': ''
    }

def get_title(project_id):
    title = ''
    for word in project_id.split('-'):
        title += word[0].upper() + word[1:] + ' '
    return title.strip()

def get_image(project_id):
    if os.path.exists(f'../images/projects/{project_id}.png'):
        return f'../images/projects/{project_id}.png'
    else:
        print(f'No image found for {project_id}, using default.')
        return '../images/projects/default-project.png'

def get_description(project_id, length = 160):
    url = f'https://raw.githubusercontent.com/Null0Fish/{project_id}/refs/heads/main/README.md'
    try:
        resp = requests.get(url, timeout=10)
    except Exception as e:
        print(f'Request error: {e}')
        return
    if resp.status_code != 200:
        print(f'GitHub returned {resp.status_code}')
        return
    text = "\n".join(resp.text.split("\n")[2:])
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    return text[:length].strip() + '...'


def del_cmd(project_id):
    projects = load_projects()
    if project_id not in projects:
        print(f'{project_id} not found.')
        return
    del projects[project_id]
    save_projects(projects)
    print(f'Deleted {project_id}.')

def add_all_cmd():
    with open(CSV_FILE, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            project_id = row[0].strip()
            add_cmd(project_id)

def purge_cmd() -> None:
    save_projects({})
    print('Purged all stored projects.')

def main() -> None:
    parser = argparse.ArgumentParser(add_help=True)
    subparsers = parser.add_subparsers(dest='command', required=True)

    add_parser = subparsers.add_parser('add')
    add_parser.add_argument('name')

    del_parser = subparsers.add_parser('del')
    del_parser.add_argument('name')

    subparsers.add_parser('add-all')

    subparsers.add_parser('purge')

    args = parser.parse_args()

    if args.command == 'add':
        add_cmd(args.name)
    elif args.command == 'del':
        del_cmd(args.name)
    elif args.command == 'purge':
        purge_cmd()
    elif args.command == 'add-all':
        add_all_cmd()

if __name__ == '__main__':
    main()
