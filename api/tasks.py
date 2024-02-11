from invoke.tasks import task

@task
def startDev(c):
    c.run("uvicorn main:app --reload")